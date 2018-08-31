'use strict';


// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import { TaskTreeDataProvider } from "./taskProvider";
import * as $ from 'jquery';



export async function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "taskrunnercode" is now active!');
	const taskTreeDataProvider: TaskTreeDataProvider = new TaskTreeDataProvider(context);
	vscode.window.registerTreeDataProvider("task-outline", taskTreeDataProvider);

	vscode.commands.registerCommand('task-outline.refreshEntry', () => taskTreeDataProvider.refresh());
	vscode.commands.registerCommand('task-outline.addEntry', a => vscode.window.showInformationMessage('Successfully called add entry'));

}

export function deactivate() {
	
}