FROM node:17-alpine
WORKDIR /app
COPY . /app
RUN npm install
COPY index.js /app/
EXPOSE 4004
CMD ["node", "index.js"]



