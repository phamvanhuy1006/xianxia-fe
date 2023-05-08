import React from 'react';
import { UnknownObj } from 'src/shared/models/common.model';

interface IAuthGuardProps {
    children: React.ReactNode;
    routes: IRoutesState[];
    path: string;
}

interface IGuestGuardProps {
    children: React.ReactNode;
    routes: IRoutesState[];
    path: string;
}

export interface IRoutesState {
    exact?: boolean;
    path?: string;
    guard?: React.FC<IAuthGuardProps | IGuestGuardProps>;
    layout?: UnknownObj;
    component?: UnknownObj;
    routes?: IRoutesState[];
    role?: string;
}
