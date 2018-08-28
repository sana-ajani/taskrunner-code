'use strict';
// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import * as $ from 'jquery';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "taskrunnercode" is now active!');

    let config = vscode.workspace.getConfiguration('tasks', vscode.window.activeTextEditor.document.uri);
    let type = config.get("command");
    let values = config.get("tasks");
 
    let taskNames = [];

    for (var i=0; i < Object.keys(values).length; i++) {
        taskNames[i] = values[i].taskName;
    }

    vscode.window.showInformationMessage(`The tasks are ${taskNames} `);

    // context.subscriptions.push(disposable);
}

export function deactivate() {

}

