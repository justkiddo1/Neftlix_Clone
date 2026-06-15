import { IMovie } from "@/types/movie.types";
import { User } from "@/types/user.types"
import axios from "axios";
import {create} from "zustand";

type IState = {
    user: User | null;
    favourites: IMovie[];
};

type IActions = {
    updateUser: () => void;
    updateFavourites: () => void; 
};

type IUserStoreState = IState & IActions;

const useUser = create<IUserStoreState>((set) => ({
    user: null,
    favourites: [],
    updateUser: async () => {
        const {data} = await axios.get("/api/me")
        const {currentUser} = data;
        set({user: currentUser})
    },
    updateFavourites: async () => {
        const {data} = await axios.get("/api/favourites");
        set({favourites: data.favourites});
    }
}));

export default useUser;