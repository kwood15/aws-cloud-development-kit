import * as path from 'path';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigateway';

export class TodoAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloLambda = new lambda.Function(this, 'HelloLambda', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'hello.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda')),
      memorySize: 256,
      timeout: cdk.Duration.seconds(10),
      environment: {
        isProduction: 'not production'
      }
    });

    new apiGateway.LambdaRestApi(this, 'Endpoint', {
      handler: helloLambda
    });
  }
}
