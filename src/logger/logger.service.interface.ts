export interface ILoggerServise{
    logger:unknown;
    info:(message:string)=>void;
    error:(...args:unknown[])=>void;
    warn:(...args:unknown[])=>void;
}