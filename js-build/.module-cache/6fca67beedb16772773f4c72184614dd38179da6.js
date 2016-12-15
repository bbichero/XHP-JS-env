var React = window.React ? window.React : require('react');
//var Dispatcher = require('flux').Dispatcher;

class Form extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            value: null,
        };
        //this.handleLength = this.handleLength.bind(this);
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
                        value: this.state.value}
                )
            )
        );
    }

    addItem()
    {
        axios.post('post.php',
        {
            item_name: this.state.value
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
                React.createElement("button", {name: "new_item", onClick: this.addItem}, "Add"), 
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
