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
            list: this.props.list,
        };
        this.addItem = this.addItem.bind(this);
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
                        maxLength: "10"}
                )
            )
        );
    }

    addItem(event)
    {
        this.setState({value: event.currentTarget.value});

        axios({
            method: 'post',
            url: 'http://xhpjs.bbichero.com/post.php',
            data: {
                item_name: event.currentTarget.value
            }
        }).then(function(response)
        {
            let new_list = this.state.list.slice();
            newArray.push(event.currentTarget.value);
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
