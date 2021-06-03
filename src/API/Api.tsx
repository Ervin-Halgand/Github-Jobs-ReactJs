import axios, { AxiosInstance } from 'axios'

export interface ApiResult {
    id: number,
    type: string,
    url: string,
    created_at: string,
    company: string,
    company_url: string,
    location: string
    title: string
    description: string
    how_to_apply: string
    company_logo: string,
}

export default class GithubJobsApi {
    private _axiosGithub: AxiosInstance;
    private _urlLocal: string = "https://github-job-proxy.herokuapp.com/";
    readonly requestMaxItemsLength: Number = 50;


    constructor() {
        this._axiosGithub = axios.create({
            baseURL: `${this._urlLocal}https://jobs.github.com/`,
            timeout: 10000,
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': true,
                "crossorigin": true,
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        });
    }

    getArgumentsJobs(title: String, location: String, type: Boolean, page: Number): Promise<ApiResult[]> {
        let urlArguments = '';
        if (title.length)
            urlArguments += `description=${title}`;
        if (type)
            urlArguments += `&full_time=${type}`;
        if (location.length)
            urlArguments += `&location=${location.replaceAll(' ', '+')}`;
        return this._axiosGithub.get(`positions.json?${urlArguments}&page=${page}`)
            .then(res => {
                return res.data;
            }).catch(error => { throw error });
    }
    getSingleJob(id: string): Promise<ApiResult> {
        return this._axiosGithub.get(`positions/${id}.json`)
            .then(res => {
                return res.data;
            }).catch(error => { throw error });
    }
}