# PressAndPlay - Sports Court Booking App

### Project Overview

Press and Play is a web application that enables users across the United States of America to reserve courts across various sporting centers in the country. The users can view the nearby courts in their current location for different sports, such as table tennis, basketball, and volleyball. They can see the rating of these courts, with the number of available slots and the distance from their location.

Once the user selects a particular court, they can view a detailed description and proceed to book one of the available slots. Once a slot is reserved, other users cannot claim the same reservation. The court manager is notified about this booking. Further, the court manager can log in and see a list of courts managed by him, the booking history for each of his courts, and can add new courts to cater to different sports across the nation.

### Project Goals

The following features are supported in the application:

 - Role based access control for two different types of users - customer and manager.
 
 - Ability to create new users.
 
 - Existing users can login to the application and their session will be tracked.
 
 - View the list of different sporting courts in the user’s current location or a custom location.
 
 - Ability to see a detailed description of the selected sporting center with its address, phone number and slot availability.

 - Ability to book slots in a particular sporting center (upon user login).
 
 - Ability to rate (upon user login) a particular sporting center. This rating will be used in future bookings to show relevant sporting centers 
   as top results for the user.
   
 - When the manager logs in they will be able to see notifications which informs them which users have booked what time slots across each of the sporting centers
   managed by them.
   
 - Ability to create a new sporting center (upon manager login).
 
 ### Software and Hardware Components
 
 1. Angular Framework - Angular was used to develop reusable user interface components supporting the frontend of the application.
 
 2. RPC / API Interfaces - RESTful APIs were used for communication between the frontend and the backend while gRPC was used for inter-service communication.
 
 3. Message Queues - Kafka was used for implementing the events such as notifying the manager when a user books a sporting center.
 
 4. Key-value Store - Redis was used as the primary caching mechanism to maintain the user session details.
 
 5. Message marshaling / encoding - Protobuf was used to marshal the messages between the various microservices.
 
 6. Databases - PostgreSQL was used to store the user and events information while MongoDB was used to store information about the various sporting centers.
 
 7. Google Cloud Storage (GCS) - An isolated service was developed which holds all the images in Google Cloud Storage related to the 
    sporting centers across the application.
    
 8. Containers and Deployment - Each microservice was packaged into its own Docker container and the entire application was deployed and orchestrated using
    Kubernetes.
    
 ### Architecture Diagram
 
 ![Architecture](https://user-images.githubusercontent.com/104844891/211956739-9bf6ce25-4f57-4705-823f-5746e20ba7d8.jpg)

