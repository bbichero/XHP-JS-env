var React = window.React ? window.React : require('react');

// class Form extends React.Component
// {
//     constructor(props)
//     {
//         super(props);
//         this.state = {
//             status: 0,
//             value: '',
//         };
//     }
//
//     checkInput(event)
//     {
//          this.setState({value: event.target.value.toUpperCase()});
//     }
//
//     renderTextField(id, name, print)
//     {
//         const field = this.props;
//         return (
//             <div className="field">
//                 <label  className="field_label" id={id}>{print}</label>
//                 <input  className={this.state.status == 1 ? "field_red" : "field"}
//                         type="text"
//                         id={id}
//                         name={name}
//                         value={this.state.value}
//                         onChange={() => this.checkInput(event)}/>
//             </div>
//         );
//     }
//
//     render()
//     {
//         return (
//             <div className="finale_form">
//                 {this.renderTextField(this.props.id, this.props.name, this.props.print)}
//             </div>
//         );
//     }
// }

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value.toUpperCase()});
  }


  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      React.createElement("form", {onSubmit: this.handleSubmit}, 
        React.createElement("label", null, 
          "Name:", 
          React.createElement("input", {type: "text", value: this.state.value, onChange: this.handleChange})
        ), 
        React.createElement("input", {type: "submit", value: "Submit"})
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
