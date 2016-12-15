var React = window.React ? window.React : require('react');
//var Dispatcher = require('flux').Dispatcher;
var axios = require('axios');


class Form extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            value: '',
        };
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(event)
    {
        this.setState({value: event.target.value});
    }

    renderList(list)
    {
        const items = list.map(function(item, id)
        {
            return (
                React.createElement("tr", null, 
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
                        onChange: this.handleSave, 
                        value: this.state.value}
                )
            )
        );
    }

    addItem(value)
    {
            console.log('qweqwe');
        axios({
            method: 'post',
            url: 'http://xhpjs.bbichero.com/post.php',
            data: {
                item_name: value
            }
        }).then(function(response)
        {
            console.log('saved successfully')
        });
    }

    render()
    {
        return (
            React.createElement("div", {className: "finale_form"}, 
                this.renderTextField(this.props.id, this.props.name, this.props.print), 
                React.createElement("button", {name: "new_item", onClick: this.addItem(this.state.value)}, "Add"), 
                React.createElement("div", null, 
                    this.renderList(this.props.list)
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
