
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface Meeting {
  id: string;
  time: string;
  participants: string;
  context: string;
}

export interface Decision {
  id: string;
  text: string;
  important: boolean;
}

export interface Memo {
  id: string;
  text: string;
  createdAt: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string; // In a real app, this wouldn't be stored like this
  avatarSeed: string;
  role: 'admin' | 'user';
}

export interface WorkspaceData {
  todos: Todo[];
  dailyWork: string;
  meetings: Meeting[];
  memos: Memo[];
  outcomes: string[];
  decisions: Decision[];
  lastSynced: number;
}

export type SyncStatus = 'synced' | 'syncing' | 'offline';
