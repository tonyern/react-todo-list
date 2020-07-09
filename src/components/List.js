import React, { Component } from 'react';

class List extends Component {

    constructor(props) {
        super(props);

        this.state = {
            indexCount: 0,
            list: [],
            task: ''
        }

        this.inputRef = React.createRef();
    }

    componentDidMount = () => {
        if (this.inputRef) {
            this.inputRef.current.focus();
        }
    }

    updateInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    incrementIndexCount() {
        this.setState((prevState) => ({
            indexCount: prevState.indexCount + 1
        }), () => { console.log('Increase Tasks', this.state.indexCount) })
    }

    decrementIndexCount() {
        this.setState((prevState) => ({
            indexCount: prevState.indexCount - 1
        }), () => { console.log('Decrease Tasks', this.state.indexCount) })
    }

    addTask(props) {
        // Create new task with a unique ID.
        const newTask = {
            id: 1 + Math.random(),
            value: props
        }

        // Increase task count.
        this.incrementIndexCount()

        this.state.list.push(newTask)

        // Update states.
        this.setState({
            list: this.state.list,
            task: ""
        })
    }

    deleteTask(props) {
        // Filter out item being deleted.
        const newList = this.state.list.filter(item => item.id !== props)

        // Decrease task count.
        this.decrementIndexCount();

        // Update states.
        this.setState({
            list: newList
        })
    }

    render() {
        return (
            <React.Fragment>
                <h1>Your TODO List</h1>

                <input type="text" placeholder="Type task here..." ref={this.inputRef}
                    value={this.state.task}
                    onChange={event => this.updateInput("task", event.target.value)} />
                
                <button onClick={() => this.addTask(this.state.task)}>Add Task</button>
                
                <h2>Number of Tasks: {this.state.indexCount}</h2>

                {this.state.list.map(individualTask => {
                    return (
                        <ul key={individualTask.id}>
                            {individualTask.value}
                            <button onClick={() => this.deleteTask(individualTask.id)}>X</button>
                        </ul>
                    )
                })}
            </React.Fragment>
        )
    }
}

export default List;