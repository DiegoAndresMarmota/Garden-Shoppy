import { Get, Route, Tags, Query, Delete, Post, Put } from 'tsoa';
import { IRelationController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';


//ORM - Relation Collection
import { getAllRelation, getRelationByID, updateRelationByID, deleteRelationByID, createRelation } from '../domain/orm/Relation.orm';

