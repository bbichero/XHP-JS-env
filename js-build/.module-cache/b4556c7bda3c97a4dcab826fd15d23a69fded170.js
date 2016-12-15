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
                    React.createElement("td", null, id), 
                    React.createElement("td", null, item)
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
        axios(
        {
            method: 'post',
            url: 'http://xhpjs.bbichero.com/post.php',
            data: {
                item_name: this.state.item
            }
        }).then((response) =>
        {
            let new_list = this.state.list.slice();
            new_list.push(this.state.item);
            console.log(this.state.item);
            console.log(new_list);
            console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
        });
    }

    render()
    {
        return (
            React.createElement("div", {className: "finale_form"}, 
                React.createElement("form", null, 
                    this.renderTextField(this.props.id, this.props.name, this.props.print)
                ), 
                React.createElement("button", {name: "new_item", onClick: this.addItem}, "Add"), 
                React.createElement("table", null, 
                    this.renderList(this.state.list)
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
