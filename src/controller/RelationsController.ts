import { Get, Route, Tags, Query, Delete, Post, Put } from 'tsoa';
import { IRelationController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';


//ORM - Relation Collection
import { getAllRelation, getRelationByID, updateRelationByID, deleteRelationByID, createRelation } from '../domain/orm/Relation.orm';
import { IRelation } from '@/domain/interfaces/IRelation.interface';

@Route("/api/relations")
@Tags("RelationController")
export class RelationsController implements IRelationController {

    /**
     * EndPoint to retrieve relations 
     * @param {string} endpoint id of Relation
     * @returns messgage information of relations
     */
    @Get("/")
    public async getRelation(@Query()page: number, @Query()limit: number, @Query()id?: string): Promise<any> {
        
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/relations] Get Relation by ID: ${id}`);
            response = await getRelationByID(id);
            
        } else {
            LogSuccess('[/api/relations] Get All Relations Request');
            response = await getAllRelation(page, limit);
        }
        return response;
    } 


    /**
     * EndPoint to delete the relations of DB
     * @param {string} id 
     * @returns All Relations found by ID
     */

    @Delete("/")
    public async deleteRelation(@Query()id?: string): Promise<any> {
        
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/relations] Get Relation by ID: ${id}`);
            await deleteRelationByID(id).then((response) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                response = {
                    status: 204,
                    message: `Relation By ID: ${id} deleted successfully`
                }
            })
        } else {
            LogWarning('[/api/relations] Delete Relation By ID Request');
            response = {
                status: 400,
                message: "Please, provide a ID to delete"
            }
        }
        return response;
    }


    @Put("/")
    public async updateRelation(@Query()id: string, relation: any): Promise<any> {
        
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/relations] Update Relation by ID: ${id}`);
            await updateRelationByID(id, relation).then((response) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                response = {
                    message: `Relation By ID: ${id} updated successfully`
                }
            })
        } else {
            LogWarning('[/api/relations] Updated Relation By ID Request');
            response = {
                message: "Please, provide a ID to updated DB"
            }
        }
        return response;
    }


    @Post("/")
    public async createRelation(relation: IRelation): Promise<any> {

        let response: any = '';

        if (relation) {
            LogSuccess(`[/api/relation] Create new relation: ${relation.name} `);
            await createRelation(relation).then((response) => {
            LogSuccess(`[/api/relations] Create Relation: ${relation.name}`);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            response = {
                message: `Relation ${relation.name} created successfully`
            }
        })
        return response;
        } else {
            LogWarning('[/api/relation] Register needs new relation');
            response = {
                message: 'Please, provide a new relation',
            }
        }
        return response;  
    }

}
