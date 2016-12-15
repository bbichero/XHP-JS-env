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
        this.handleLength = this.handleLength.bind(this);
    }

    handleLength(event)
    {
    }

    renderTextField(id, name, print)
    {
        let form_class = this.state.status == 1 ? "field_red" : "field";
        return (
            React.createElement("div", {className: "field"}, 
                React.createElement("label", {className: "field_label", id: id}, print), 
                React.createElement("input", {className: form_class, 
                        type: "text", 
                        id: id, 
                        name: name, 
                        value: this.state.value, 
                        onChange: this.handleLength, 
                        maxLength: "10"}
                        )
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
//
// class Form extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {value: ''};
//
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   handleChange(event) {
//     this.setState({value: event.target.value.toUpperCase()});
//   }
//
//
//   handleSubmit(event) {
//     alert('A name was submitted: ' + this.state.value);
//     event.preventDefault();
//   }
//
//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name:
//           <input type="text" value={this.state.value} onChange={this.handleChange} />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }


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
