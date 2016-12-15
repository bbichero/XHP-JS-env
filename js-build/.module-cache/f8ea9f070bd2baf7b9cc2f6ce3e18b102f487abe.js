var React = window.React ? window.React : require('react');

class Form extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            status: 0,
            value: '',
        };
    }

    handleChange(event)
    {
        // if (this.state.value.lenght > 5)
        //     this.setState({status: 1});
        // event.preventDefault();
        this.setState({value: event.target.value.toUpperCase()});
    }

    renderTextField(id, name, print)
    {
        return (
            React.createElement("div", {className: "field"}, 
                React.createElement("label", {className: "field_label", id: id}, print), 
                React.createElement("input", {className: this.state.status == 1 ? "field_red" : "field", 
                        type: "text", 
                        id: id, 
                        name: name, 
                        value: this.state.value, 
                        onChange: this.handleChange})
            )
        );
    }

    render()
    {
        return (
            React.createElement("div", {className: "finale_form"}, 
                this.renderTextField(this.props.id, this.props.name, this.props.print)
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
