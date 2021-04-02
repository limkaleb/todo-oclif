import {Command} from '@oclif/command'
const chalk = require('chalk')
const Table = require('cli-table')
import todoAPI from '../api/todo-api'

export default class List extends Command {
  static description = 'Print out all todos'

  async run() {
    const table = new Table({
      head: [
        chalk.blueBright('index'),
        chalk.blueBright('todo'),
        chalk.blueBright('status'),
      ],
    })
    const todos = todoAPI.list()
    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i]
      const status = todo.done ? chalk.green('done') : chalk.red('not done')
      table.push([i, todo.todo, status])
    }
    this.log(table.toString())
  }
}
