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
        this.addItem = this.addItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    renderList(list)
    {
        const items = list.map(function(item, id)
        {
            return (
                React.createElement("tr", {key: id}, 
                    React.createElement("td", null, item.id), 
                    React.createElement("td", null, item.value)
                )
            );
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
                React.createElement("div", {className: "tab"}, 
                    React.createElement("button", {name: "new_item", onClick: this.addItem}, "Add"), 
                    React.createElement("table", null, 
                        this.renderList(this.state.list)
                    )
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
