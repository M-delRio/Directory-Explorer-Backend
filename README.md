API documentation can be found [here](./docs/api.md).

# Express App Production Notes

The following steps are recommended prior to deployment.

## Restarts - Process Manager and an Init System

A process manager such as *PM2* can be used to run and the app also restart the app if it crashes.

An init system, such as *systemd*, can be used to encapsulate the process manager  and in the case the case the server crashes the process manager will restart following an OS restart to ensure the app restarts. 

## Clusters

A process manager such as *PM2* can also be used to run the app in a cluster without changing code. 

## Authentication/Authorization

Initial rollout could include authentication for users who should have access to all of the server's home directory content. Authorization could then be used to provide certain users access to this service and restrict what folders they are permitted to view.  

## Domain Name and SSL certificate

A deployment service has not been chosen. Once the provider has been selected a domain name and SSL certificate may be obtained from the same provider.

## Web Server - Nginx

A web server such as Nginx could provide many feature to decrease the load on our application server(s).

### Compression
Currently compression is enabled via the node *compression* module however this role is better suited for a web server. 

### Other

Nginx could also be used to **cache requests** and for **load balancing** if multiple application servers are used. 





