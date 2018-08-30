'use strict';


// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import { FileExplorer } from './fileExplorer';

class StrippedTask {
	constructor(public _type: String, public _script: String){
	};
}

export async function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "taskrunnercode" is now active!');
	
    let tasks = await vscode.tasks.fetchTasks().then(function(value) {
		return value;
	});

	let iterableTasks: StrippedTask[] = [];

	for (var i = 0; i < tasks.length; i++) {
		iterableTasks[i] = new StrippedTask(tasks[i].definition.type, tasks[i].definition.script);
	}

	//Complete Tree View Sample
	new FileExplorer(context);
	

}

export function deactivate() {
	
}