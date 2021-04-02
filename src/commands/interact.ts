import {Command} from '@oclif/command'
import * as inquirer from 'inquirer'
import todoAPI from '../api/todo-api'

export default class Interact extends Command {
  static description = 'enter the interacting mode'

  async run() {
    const source = todoAPI.list()
    const choices = source
    const prompt: any = await inquirer.prompt([
      {
        type: 'checkbox',
        message: 'Update todo',
        name: 'todos',
        choices: choices.map(todo => {
          return {name: todo.todo, checked: todo.done}
        }),
      },
    ])

    const finishedTodo = prompt.todos
    source.forEach((todo, index) => {
      if (finishedTodo.indexOf(todo.todo) !== -1) {
        todoAPI.done(index)
      } else if (finishedTodo.indexOf(todo.todo) >= 0) {
        todoAPI.undone(index)
      }
    })
  }
}
