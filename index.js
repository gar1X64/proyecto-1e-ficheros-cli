#!/usr/bin/env node

const shelljs = require("shelljs");
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");

const ficheroOK = (filePath) =>
  console.log(
    chalk.white.bgGreen.bold(` GENIAL ! `),
    chalk.white.bgGray.bold(`fichero creado en ${filePath}`),
    filePath
  );

const crearFichero = (nombreFichero, extension) => {
  //pwd
  const pathFichero = `${process.cwd()}/${nombreFichero}.${extension}`;
  shelljs.touch(pathFichero);
  return pathFichero;
};

const hacerPreguntas = () => {
  const preguntas = [
    {
      name: "FICHERO",
      type: "input",
      message: "¿Como se va a llamar tu fichero? - (sin extensión)",
    },
    {
      name: "EXTENSION",
      type: "list",
      message: "¿Que extension tiene tu fichero?",
      choices: [".rb", ".js", ".kt", ".java", ".ts", ".php", ".html"],
      filter: function (val) {
        return val.split(".")[1];
      },
    },
  ];
  return inquirer.prompt(preguntas);
};

const iniciar = () => {
  console.log(
    chalk.green(
      figlet.textSync("CLIFile - Creator", {
        font: "Computer",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
};

const ejecutar = async () => {
  //mostrar la información de la libreria en la cabecera, el titulo con figlet
  iniciar();
  //preguntas necesarias para crear el fichero, el nombre y la extension
  const respuestas = await hacerPreguntas();
  const { FICHERO, EXTENSION } = respuestas;
  console.log(respuestas);
  //creamos el fichero
  const pathFichero = crearFichero(FICHERO, EXTENSION);
  //Añádimos mensaje que el fichero se ha añadido correctamente
  ficheroOK(pathFichero);
};

ejecutar();
