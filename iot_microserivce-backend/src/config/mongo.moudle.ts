import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => {
                try {
                    let url = `${process.env.MONGODB_URI}`
                    console.log('===========>> DB Url', url)
                    return {
                        uri: `${process.env.MONGODB_URI || 'mongodb://localhost:27017/IoT_things'}`
                    };
                } catch (error) {
                    console.log(error)
                    // Handle connection error here
                    console.error('Mongoose connection error:', error);
                    throw new Error('Mongoose connection error');
                }
            }
        })
    ]
})
export class MongoModule { }