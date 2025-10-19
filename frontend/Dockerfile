FROM node:20-alpine

WORKDIR /app

# ✅ Add trailing slash to make destination explicit
COPY package*.json ./

# Optional: add --omit=dev for smaller production image
RUN npm install --production --force

# Copy the rest of the app
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
