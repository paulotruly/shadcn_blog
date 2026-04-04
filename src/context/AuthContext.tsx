import type { AuthResponse, UserResponse } from "@/types";
import { createContext, useContext, useReducer, type ReactNode } from "react";

type AuthState = {
    user: AuthResponse | null;
    userDetails: UserResponse | null;
    isAuthentic: boolean;
    isLoading: boolean;
}

type AuthAction = 
    | { type: "LOGIN"; payload: AuthResponse }
    | { type: "LOGOUT" }
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "SET_USER_DETAILS"; payload: UserResponse};

function AuthReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
                isAuthentic: true,
                isLoading: false
            };
        
        case "LOGOUT":
            return {
                ...state, 
                user: null,
                userDetails: null,
                isAuthentic: false,
                isLoading: false
            };
        
        case "SET_LOADING":
            return {
                ...state, 
                isLoading: action.payload
            };
        
        case "SET_USER_DETAILS":
            return {
                ...state,
                userDetails: action.payload
            };
    }
}

interface AuthContextType {
    user: AuthResponse | null;
    userDetails: UserResponse | null;
    isAuthentic: boolean;
    isLoading: boolean;
    login: (data: AuthResponse) => void; 
    logout: () => void;
    fetchUserDetails: (id: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userDetails: null,
    isAuthentic: false,
    isLoading: false,
    login: () => {},
    logout: () => {},
    fetchUserDetails: async () => {}
});

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({children}: AuthProviderProps) {
    
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null,    
        userDetails: null,      
        isAuthentic: false, 
        isLoading: false   
    });

    const login = (data: AuthResponse) => {
        dispatch({ type: "LOGIN", payload: data });
    }

    const logout = () => {
        dispatch({ type: "LOGOUT" });
    }

    const fetchUserDetails = async (id: number) => {
        const response = await fetch(`https://dummyjson.com/users/${id}`)
        const data: UserResponse = await response.json()
        dispatch({ type: "SET_USER_DETAILS", payload: data })
    }
    
    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                userDetails: state.userDetails,
                isAuthentic: !!state.user,
                isLoading: state.isLoading,
                login,
                logout,
                fetchUserDetails
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    
    return context;
}