var React = window.React ? window.React : require('react');
//var Dispatcher = require('flux').Dispatcher;
var axios = require('axios');


class Form extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            item: "",
            list: this.props.list,
            select: Array(0).fill(null),
        };
        this.state.list.forEach((element, index) =>
        {
            this.state.list[index].status = "";
            this.state.list[index].select = "";
            this.state.list[index].new_value = this.state.list[index].value;
        });

        this.updateItem = this.updateItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.delItem = this.delItem.bind(this);
        this.delSelect = this.delSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    renderList(list)
    {
        const items = list.map((item, id) =>
        {
            if (item.status === "edit")
            {
                return (
                    React.createElement("tr", {key: id}, 
                        React.createElement("td", null, React.createElement("input", {type: "checkbox", onClick: this.handleSelect.bind(this, item)})), 
                        React.createElement("td", null, item.id), 
                        React.createElement("td", null, 
                            React.createElement("input", {className: "field", 
                                    type: "text", 
                                    id: id, 
                                    name: name, 
                                    maxLength: "10", 
                                    value: item.new_value, 
                                    onChange: this.handleEditChange.bind(this, item)}
                            )
                        ), 
                        React.createElement("td", null, React.createElement("button", {onClick: this.editItem.bind(this, item)}, "Undo")), 
                        React.createElement("td", null, React.createElement("button", {name: "new_item", onClick: this.updateItem.bind(this, item, item.id)}, "Update")), 
                        React.createElement("td", null, React.createElement("button", {name: "delete", onClick: this.delItem.bind(this, item, id)}, "X"))
                    )
                );
            }
            else
            {
                return (
                    React.createElement("tr", {key: id}, 
                        React.createElement("td", null, React.createElement("input", {type: "checkbox", onClick: this.handleSelect.bind(this, item)})), 
                        React.createElement("td", null, item.id), 
                        React.createElement("td", {onClick: this.editItem.bind(this, item)}, item.value), 
                        React.createElement("td", null, React.createElement("button", {name: "delete", onClick: this.delItem.bind(this, item, id)}, "X"))
                    )
                );
            }
        });

        return items;
    }

    renderTextField(id, name, print)
    {
        return (
            React.createElement("div", {className: "field"}, 
                React.createElement("label", {className: "field_label", id: id}, print), 
                React.createElement("input", {className: "field", 
                        type: "text", 
                        id: id, 
                        name: name, 
                        maxLength: "10", 
                        value: this.state.item, 
                        onChange: this.handleChange}
                )
            )
        );
    }

    // Set to true of false select variable in list
    handleSelect(item, event)
    {
        let index = this.state.list.indexOf(item);
        if (this.state.list[index].select === true)
        {
            this.state.list[index].select = false;
            let index = this.state.select.indexOf(item.id);
            this.state.select.splice(index, 1);
        }
        else
        {
            this.state.list[index].select = true;
            this.state.select.splice(0, 0, item.id);
        }
        this.setState( {list: this.state.list} );
        this.setState( {select: this.state.select} );
    }

    handleChange(event)
    {
        this.setState( {item: event.target.value} );
    }

    handleEditChange(item, event)
    {
        let index = this.state.list.indexOf(item);
        this.state.list[index].new_value = event.target.value;
        this.setState( {list: this.state.list} );
    }

    editItem(item, event)
    {
        let index = this.state.list.indexOf(item);
        if (this.state.list[index].status !== "edit")
            this.state.list[index].status = "edit";
        else
            this.state.list[index].status = "";

        this.setState({list: this.state.list});
    }

    delSelect(event)
    {
        let id_del = this.state.select.join(",");
        axios(
        {
            method: 'POST',
            url: 'http://xhpjs.bbichero.com/post.php',
            data: "delete_select=" + id_del
            // headers: {
            //     'Content-type': 'application/json',
            //     'Accept': 'application/json'
            // }
        }).then((response) =>
        {
            // Check id deleted in parameter with response id from post.php
            // Check index of tab pass in parameter with index deleted from array list
            if (id_del == response.data)
            {
                for (let i = 0; this.state.select[i]; i++)
                {
                    console.log(this.state.select[i]);
                    let index = this.state.select.indexOf(this.state.select[i]);
                    console.log(index);
                    console.log(this.state.list[index].select);
                    this.state.list[index].select = false;
                    this.state.select.splice(index, 1);
                }

                this.setState( {list: this.state.list} );
                this.setState( {select: this.state.select} );
            }
        });
    }

    updateItem(item, id, event)
    {
        let update_item = 'update_id=' + id + '&new_value=' + item.new_value;
        let index = this.state.list.indexOf(item);

        if (item.value !== item.new_value)
        {
            axios(
            {
                method: 'POST',
                url: 'http://xhpjs.bbichero.com/post.php',
                data: update_item
                // headers: {
                //     'Content-type': 'application/json',
                //     'Accept': 'application/json'
                // }
            }).then((response) =>
            {
                if (id == response.data.update_id && item.new_value === response.data.new_value)
                    this.state.list[index].value = response.data.new_value;

                // Update status to null
                this.state.list[index].status = "";
                this.setState({list: this.state.list});
            });
        }
        else
        {
            // Update status to null
            this.state.list[index].status = "";
            this.setState({list: this.state.list});
        }
    }

    delItem(item, id, event)
    {
        axios(
        {
            method: 'POST',
            url: 'http://xhpjs.bbichero.com/post.php',
            data: "delete_id=" + item.id
            // headers: {
            //     'Content-type': 'application/json',
            //     'Accept': 'application/json'
            // }
        }).then((response) =>
        {
            // Check id deleted in parameter with response id from post.php
            // Check index of tab pass in parameter with index deleted from array list
            let check = this.state.list.splice(id, 1)[0];
            if (response.data == item.id && check === item)
                this.setState({list: this.state.list});
        });
    }

    addItem(event)
    {
        // event.preventDefault();
        this.setState({item: event.target.value});
        let item = 'new_item=' + this.state.item;
        axios(
        {
            method: 'POST',
            url: 'http://xhpjs.bbichero.com/post.php',
            data: item
            // headers: {
            //     'Content-type': 'application/json',
            //     'Accept': 'application/json'
            // }
        }).then((response) =>
        {
            var new_list = this.state.list.slice();
            new_list.push(response.data);
            this.setState({list: new_list});
        });
    }

    render()
    {
        return (
            React.createElement("div", {className: "finale_form"}, 
                React.createElement("form", null, 
                    this.renderTextField(this.props.id, this.props.name, this.props.print)
                ), 
                React.createElement("center", null, 
                    React.createElement("button", {name: "new_item", onClick: this.addItem}, "Add"), 
                    React.createElement("button", {name: "del_select", onClick: this.delSelect}, "Del"), 
                    React.createElement("table", null, 
                        this.renderList(this.state.list)
                    )
                )
            )
        );
    }
}

// ========================================

// ReactDOM.render(
//     <Form />,
//     document.getElementById('form')
// );

if (typeof module != 'undefined') {
  module.exports = Form;
} else {
  window.Form = Form;
}
