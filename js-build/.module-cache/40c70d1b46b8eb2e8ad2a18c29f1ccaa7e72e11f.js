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
        };
        var tmp = this.state.list;
        tmp.forEach((element, index) =>
        {
            tmp[index]['status'] = "";
        });
        this.setState({list: tmp});
        console.log(this.state.list);

        this.updateItem = this.updateItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.delItem = this.delItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
    }

    renderList(list)
    {
        const items = list.map((item, id) =>
        {
            if (item.status === "edit")
            {
                return (
                    React.createElement("tr", {key: id}, 
                        React.createElement("td", null, item.id), 
                        React.createElement("td", null, 
                            React.createElement("input", {className: "field", 
                                    type: "text", 
                                    id: id, 
                                    name: name, 
                                    maxLength: "10", 
                                    value: item.new_value, 
                                    onChange: this.handleEditChange}
                            )
                        ), 
                        React.createElement("td", null, React.createElement("button", {name: "new_item", onClick: this.updateItem}, "Update")), 
                        React.createElement("td", null, React.createElement("button", {name: "delete", onClick: this.delItem.bind(this, item, id)}, "X"))
                    )
                );
            }
            else
            {
                return (
                    React.createElement("tr", {key: id}, 
                        React.createElement("td", null, item.id), 
                        React.createElement("td", {onClick: this.editItem}, item.value), 
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

    handleChange(event)
    {
        this.setState( {item: event.target.value} );
    }

    handleEditChange(event)
    {
        this.setState( {item_up: event.target.value} );
    }

    editItem()
    {
        if (this.state.item_edit === true)
            this.setState({item_edit: false});
        else
            this.setState({item_edit: true});
    }

    updateItem(event, id)
    {
        // event.preventDefault();
        this.setState({item: event.target.value});
        let item = 'id_item=' + this.state.item;
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

        this.setState({item_edit: false});
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
