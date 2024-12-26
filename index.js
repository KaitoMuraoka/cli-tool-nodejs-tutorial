#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
      const rainbowTitle = chalkAnimation.rainbow(
      'Who Wants to Be A JavaScript Millionaire? \n');

      await sleep();
      rainbowTitle.stop();
      console.log(`
            ${chalk.bgBlue("HOW TO PLAY")}
            I am a process on your computer.
            If you get any question wron gi will be ${chalk.bgRed("killed")}
            `);
} 

async function askName() {
      const answer = await inquirer.prompt({
            name: 'player_name',
            type: 'input',
            message: 'What is your name?',
            default() {
                  return 'Player';
            },
      });
      playerName = answer.player_name;
} 

async function question1() {
      const answer = await inquirer.prompt({
            name: 'question1',
            type: 'list',
            message: 'JavaScript was created in 10days then released on \n',
            choices: [
                  'May 23rd, 1995',
                  'Nov 24th, 1995',
                  'Dec 4th, 1995',
                  'Dec 17, 1996'
            ],
      });
      return handlerAnswer(answer.question1 == 'Dec 4th, 1995');
}

async function handlerAnswer(isCorrect) {
      const spinner = createSpinner('Checking answer...').start();
      await sleep();

      if (isCorrect) {
            spinner.success({ text: `Nice work ${playerName}.` })
      } else {
            spinner.error({ text: `Error: Game Over, you lose ${playerName}` })
            process.exit(1);
      }
}

function winner() {
      console.clear();
      const msg = `Congrats, ${playerName}!`;
      
      figlet(msg, (err, data) => {
            console.log(gradient.pastel.multiline(data));
      })
} 

await welcome();
await askName();
await question1();
// ...
await winner();