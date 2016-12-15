var React = window.React ? window.React : require('react');

class Form extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            status: 0,
        };
    }

    checkInput(value)
    {
         if (value.lenght > 10)
            this.setState({status: 1});
    }

    renderTextField(id, name, print)
    {
        var value = "";

        return (
            React.createElement("div", {className: "field"}, 
                React.createElement("label", {className: "field_label", id: id}, print), 
                React.createElement("input", {className: "field", 
                        style: this.status ? {borer: '1px solid red'} : {}, 
                        type: "text", 
                        id: id, 
                        name: name, 
                        value: value, 
                        onChange: () => this.checkInput(value)})
            )
        );
    }

    render()
    {
        return (
            React.createElement("div", {className: "finale_form"}, 
                this.renderTextField(this.props.id, this.props.name, this.props.value, this.props.print)
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
