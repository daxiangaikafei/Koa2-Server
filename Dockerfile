FROM node
COPY * /user/src/
RUN npm i nrm -g \
    && nrm use taobao \
    && npm i typescript pm2 -g \
    && npm install
RUN ls /user/src
RUN cd /user/src
CMD ["tsc","--project","tsconfig.json"]
RUN export NODE_ENV=production
RUN ["pm2","start","/user/src/app/app.js"]
RUN ["pm2","list"]