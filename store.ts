
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { WorkspaceData, Todo, Meeting, Decision, SyncStatus, User } from './types';

interface WorkspaceStore extends WorkspaceData {
  // Auth State
  currentUser: User | null;
  users: User[];
  
  // Sync State
  syncStatus: SyncStatus;
  setSyncStatus: (status: SyncStatus) => void;
  
  // Auth Actions
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (user: Omit<User, 'id'>) => void;
  updateProfile: (updates: Partial<User>) => void;
  deleteAccount: (userId: string) => void;

  // Todos
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompletedTodos: () => void;
  
  // Daily Work
  updateDailyWork: (text: string) => void;
  
  // Meetings
  addMeeting: (meeting: Omit<Meeting, 'id'>) => void;
  deleteMeeting: (id: string) => void;
  
  // Memos
  updateMemos: (text: string) => void;
  
  // Outcomes
  updateOutcome: (index: number, text: string) => void;
  
  // Decisions
  addDecision: (text: string) => void;
  toggleDecisionImportance: (id: string) => void;
  deleteDecision: (id: string) => void;
}

const triggerSync = (set: any) => {
  set({ syncStatus: 'syncing' });
  setTimeout(() => {
    set({ syncStatus: 'synced', lastSynced: Date.now() });
  }, 800);
};

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set, get) => ({
      // Initial Data
      todos: [],
      dailyWork: '',
      meetings: [],
      memos: '',
      outcomes: ['', '', ''],
      decisions: [],
      lastSynced: Date.now(),
      syncStatus: 'synced',

      // User State
      currentUser: null,
      users: [],

      setSyncStatus: (syncStatus) => set({ syncStatus }),

      // Auth Logic
      login: (username, password) => {
        const user = get().users.find(u => u.username === username && u.password === password);
        if (user) {
          set({ currentUser: { ...user } });
          return true;
        }
        return false;
      },

      logout: () => set({ currentUser: null }),

      register: (userData) => {
        const newUser: User = {
          ...userData,
          id: Math.random().toString(36).substring(2, 11),
        };
        set(state => ({
          users: [...state.users, newUser],
          currentUser: newUser // Automatically log in after register
        }));
      },

      updateProfile: (updates) => {
        set(state => {
          if (!state.currentUser) return state;
          const updatedUser = { ...state.currentUser, ...updates };
          return {
            currentUser: updatedUser,
            users: state.users.map(u => u.id === state.currentUser?.id ? updatedUser : u)
          };
        });
        triggerSync(set);
      },

      deleteAccount: (userId) => {
        set(state => ({
          users: state.users.filter(u => u.id !== userId),
          currentUser: state.currentUser?.id === userId ? null : state.currentUser
        }));
      },

      // Workspace Actions
      addTodo: (text) => {
        set((state) => ({
          todos: [{ id: Math.random().toString(36).substring(2, 11), text, completed: false, createdAt: Date.now() }, ...state.todos]
        }));
        triggerSync(set);
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        }));
        triggerSync(set);
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter(t => t.id !== id)
        }));
        triggerSync(set);
      },

      clearCompletedTodos: () => {
        set((state) => ({
          todos: state.todos.filter(t => !t.completed)
        }));
        triggerSync(set);
      },

      updateDailyWork: (dailyWork) => {
        set({ dailyWork });
      },

      addMeeting: (meeting) => {
        set((state) => ({
          meetings: [...state.meetings, { ...meeting, id: Math.random().toString(36).substring(2, 11) }]
        }));
        triggerSync(set);
      },

      deleteMeeting: (id) => {
        set((state) => ({
          meetings: state.meetings.filter(m => m.id !== id)
        }));
        triggerSync(set);
      },

      updateMemos: (memos) => {
        set({ memos });
      },

      updateOutcome: (index, text) => {
        set((state) => {
          const newOutcomes = [...state.outcomes];
          newOutcomes[index] = text;
          return { outcomes: newOutcomes };
        });
        triggerSync(set);
      },

      addDecision: (text) => {
        set((state) => ({
          decisions: [...state.decisions, { id: Math.random().toString(36).substring(2, 11), text, important: false }]
        }));
        triggerSync(set);
      },

      toggleDecisionImportance: (id) => {
        set((state) => ({
          decisions: state.decisions.map(d => d.id === id ? { ...d, important: !d.important } : d)
        }));
        triggerSync(set);
      },

      deleteDecision: (id) => {
        set((state) => ({
          decisions: state.decisions.filter(d => d.id !== id)
        }));
        triggerSync(set);
      },
    }),
    {
      name: 'workspace-storage-v2',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
