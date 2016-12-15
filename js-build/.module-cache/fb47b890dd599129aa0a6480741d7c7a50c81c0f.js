var React = window.React ? window.React : require('react');

class Form extends React.Component
{
    constructor()
    {
        super();
        this.state = {};
    }

    // checkInput(value)
    // {
    //     if (value.lenght > 50)
    //     for()
    // }

    renderTextField(id, name, value, print, status)
    {
        return (
            React.createElement("div", {className: "field"}, 
                React.createElement("label", {className: "field_label", id: id}, print), 
                React.createElement("input", {className: "field", 
                        style: status ? {borer: '1px solid red'} : {}, 
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
                this.renderTextField(this.props.id, this.props.name, this.props.value, this.prosp.print, this.props.status)
            )
        );
    }
}

// ========================================

// ReactDOM.render(
//     <Form />,
//     document.getElementById('form')
// );
