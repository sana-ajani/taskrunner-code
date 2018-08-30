import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class TaskProvider implements vscode.TreeDataProvider<Task> {
    private _onDidChangeTreeData: vscode.EventEmitter<Task | undefined> = new vscode.EventEmitter<Task | undefined>();
	readonly onDidChangeTreeData: vscode.Event<Task | undefined> = this._onDidChangeTreeData.event;

    constructor(private workspaceRoot: String) {
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: Task) {
        return element;
    }

    getChildren(element?: Task): Thenable<Task[]> {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No tasks in an empty workspace');
            return Promise.resolve([]);
        }

        if (element) {
            return this.getTasks();
        } else {
            vscode.window.showInformationMessage('Workspace has no tasks');
        }

    }

    private async getTasks(): Promise<Task[]> {
        let tasks = await vscode.tasks.fetchTasks();
    
        let iterableTasks: Task[] = [];
    
        for (var i = 0; i < tasks.length; i++) {
            iterableTasks[i] = new Task(tasks[i].definition.label, tasks[i].definition.type, tasks[i].definition.script);
        }

        return iterableTasks;
    }
}

class Task extends vscode.TreeItem {

    constructor(
        public readonly label: string,
        private type: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
    }

    get tooltip(): string {
        return `${this.type}-${this.label}`
    }

    contextValue = 'task';
}
