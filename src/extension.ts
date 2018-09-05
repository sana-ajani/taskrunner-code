'use strict';

import * as vscode from 'vscode';
import { TaskTreeDataProvider } from './taskProvider'

export function activate(context: vscode.ExtensionContext) {

	const taskTreeDataProvider = new TaskTreeDataProvider(context);

	vscode.window.registerTreeDataProvider('taskOutline', taskTreeDataProvider);
	vscode.commands.registerCommand('taskOutline.refresh', () => taskTreeDataProvider.refresh());
	
	context.subscriptions.push(vscode.commands.registerCommand('vscode.executeTask', task => {
		vscode.tasks.executeTask(task).then(function (value) {
			console.log("executing task!");
			return value;
		});	
	}));
}

export function deactivate(): void {
	
}