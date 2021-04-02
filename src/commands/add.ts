import {Command, flags} from '@oclif/command'
import chalk = require('chalk')
import todoAPI from '../api/todo-api'

export default class Add extends Command {
  static description = 'add new todo list'

  static flags = {
    done: flags.boolean({char: 'd'}),
  }

  static args = [{name: 'todo'}]

  async run() {
    const {args, flags} = this.parse(Add)

    const todo = args.todo

    if (todo) {
      if (flags.done) {
        todoAPI.add(todo, true)
      } else {
        todoAPI.add(todo)
      }
      this.log(`${chalk.green('[Success]')} Added new todo: ${todo}`)
    } else {
      this.error(chalk.red('please specify the new todo'))
    }
  }
}
