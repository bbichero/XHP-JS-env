var React = window.React ? window.React : require('react');
//var Dispatcher = require('flux').Dispatcher;

class Form extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            value: '',
        };
        //this.handleLength = this.handleLength.bind(this);
    }

    renderList()
    {
        const list = new Array();
        list[1] = 'item1';
        list[2] = 'item2';
        const items = list.map(function(item, id)
        {
            return (
                React.createElement("tr", null, 
                    React.createElement("td", null, id), 
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
                        maxLength: "10"}
                )
            )
        );
    }

    render()
    {
        return (
            React.createElement("div", {className: "finale_form"}, 
                this.renderTextField(this.props.id, this.props.name, this.props.print), 
                React.createElement("div", null, 
                    this.renderList()
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
