import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";


interface Genre{
    id:number;
    name: string;

}

interface FetchGenreResponse{

    count: number;
    results: Genre[];
}

const useGenres = () =>{
    const [genres, setGenres] = useState<Genre[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {

        const controller = new AbortController();
      //need interface to describe the shape of the response

      setLoading(true);
      apiClient
        .get<FetchGenreResponse>("/genres",{signal: controller.signal})
        .then((res) => {setGenres(res.data.results)
        setLoading(false);
        })
        .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message);//else
            setLoading(false);
        }); 

        //clean up function
        return () => controller.abort();
    },[]);

    return {genres,error,isLoading}

}

export default useGenres;