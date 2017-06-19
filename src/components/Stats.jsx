import React from 'react';

class Stats extends React.Component {
    total() {
        return this.props.todos.length;
    }
    done() {
        return this.props.todos.filter((item) => item.completed).length;
    }
    left() {
        return this.total() - this.done();
    }

    render() {
        return (
            <section className="stats">
                <h4>Всего задач: <span>{this.total()}</span></h4>
                <h4>Выполнено: <span>{this.done()}</span></h4>
                <h4>Осталось: <span>{this.left()}</span></h4>
            </section>
        );
    }
}

export default Stats;