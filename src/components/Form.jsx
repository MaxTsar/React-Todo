import React from 'react';

class Form extends React.Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let val = this.refs.todoValue.value;
        this.props.onAdd(val);
        this.refs.todoValue.value = '';
    }

    render() {
        return (
            <section className="form-wrap">
                <form className="form">
                    <input type="text" ref="todoValue" placeholder="Введите задачу" className="display"/>
                    <input type="submit" value="Добавить" className="submit" onClick={this.handleSubmit}/>
                </form>
            </section>
        );
    }
}

export default Form;