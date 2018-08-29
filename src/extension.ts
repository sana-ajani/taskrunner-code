'use strict';


// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import * as $ from 'jquery';

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

	for (var i = 0; i < 2; i++) {
		iterableTasks[i] = new StrippedTask(tasks[i].definition.type, tasks[i].definition.script);
	}

}

export function deactivate() {
	
}