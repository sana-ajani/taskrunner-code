import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { resolve } from 'dns';

export class TaskTreeDataProvider implements vscode.TreeDataProvider<Task> {
    public static readonly config: vscode.WorkspaceConfiguration;

    public readonly _onDidChangeTreeData: vscode.EventEmitter<Task | null> = new vscode.EventEmitter<Task | null>();
    public readonly onDidChangeTreeData: vscode.Event<Task | null> = this._onDidChangeTreeData.event;


    constructor(private context: vscode.ExtensionContext) {

    }

    public refresh() {
        this._onDidChangeTreeData.fire();
    }

    public getTreeItem(item: Task): vscode.TreeItem {
        return item;
    }

    public async getChildren(item?: Task): Promise<Task[]> {
        if (!this.context) {
			vscode.window.showInformationMessage('No dependency in empty workspace');
			return Promise.resolve([]);
        }

        if (item) {
            this.getTasks;
        } else {
            vscode.window.showInformationMessage('Project has no tasks');
            return Promise.resolve([]);
        }

    }

    private async getTasks(): Promise<Task[]> {
        let tasks = await vscode.tasks.fetchTasks().then(function (value) {
            return value;
        });

        let iterableTasks: Task[] = [];

        if (tasks.length !== 0) {
            for (var i = 0; i < tasks.length; i++) {
                iterableTasks[i] = new Task(tasks[i].definition.script, tasks[i].definition.type, vscode.TreeItemCollapsibleState.Collapsed);
            }
        } else {
            console.log("uh oh");
        }
        return iterableTasks;
    }
}

class Task extends vscode.TreeItem {

    constructor(
        public readonly label: string,
        private type: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public command?: vscode.Command
    ) {
        super(label, collapsibleState);
    }

    get tooltip(): string {
        return `${this.type}-${this.label}`
    }

    iconPath = path.join(__filename, '..', '..', '..', 'assets', 'code.svg');

    contextValue = 'task';
}
