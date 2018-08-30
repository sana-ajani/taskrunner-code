'use strict';


// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import { TaskProvider } from './taskProvider'

class StrippedTask {
	constructor(public _type: String, public _script: String){
	};
}

function goToDefinition(range: vscode.Range) {

    const editor: vscode.TextEditor = vscode.window.activeTextEditor;
    // Center the method in the document
    editor.revealRange(range, vscode.TextEditorRevealType.InCenter);

    // Select the method name
    editor.selection = new vscode.Selection(range.start, range.end);

    // Swap the focus to the editor
    vscode.window.showTextDocument(editor.document, editor.viewColumn, false);
}

export async function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "taskrunnercode" is now active!');
	
	const rootPath = vscode.workspace.rootPath;
	const taskProvider = new TaskProvider(rootPath);

	
	vscode.window.registerTreeDataProvider('taskRunner', taskProvider);
	vscode.commands.registerCommand("extension.treeview.goto", (range: vscode.Range) => goToDefinition(range));
	vscode.commands.registerCommand('taskRunner.refreshEntry', () => taskProvider.refresh());
	vscode.commands.registerCommand('taskRunner.addEntry', node => vscode.window.showInformationMessage('Successfully called add entry'));
	vscode.commands.registerCommand('taskRunner.deleteEntry', node => vscode.window.showInformationMessage('Successfully called delete entry'));

	console.log('It worked');
}

export function deactivate() {
	
}