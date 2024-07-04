import { NextFunction, Request, Response } from "express";
import blogService from "../services/blogs.service";
import AppError from "../../errors/AppError";
import errorCodes from "../../errors/errorCodes";
import userService from "../services/users.service";
import { JWT_OPTIONS } from "../../configs";
import logger from "../../configs/log";

export const getAllBlogs = async (req: Request, res: Response) => {
  logger.debug("Start getting blogs");
  const blogs = await blogService.getAll();
  logger.debug("Getting all blogs success");
  res.status(200).json({ data: blogs });
};

export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, content } = req.body;
    logger.debug(`Start creating blog: ${title}`);
    if (!req.file) {
      throw new AppError(400, errorCodes.BAD_REQUEST, "Image is required");
    }
    const image_url = req.file.path;
    const token: string = JWT_OPTIONS.jwtCookieName;
    const authToken: string = req.cookies[token];
    const user = await userService.findByToken(authToken);

    const { id: user_id } = user;
    const blogData = { title, image_url, description, content, user_id };
    logger.debug(`Blog data: ${blogData}`);
    const newBlog = await blogService.create(blogData);
    logger.debug(`Create blog: ${newBlog.title} Successfully`);
    res.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogId = req.params.id;
    const { title, description, content } = req.body;
    logger.debug(`Start updating blog: ${title}`);
    if (!req.file) {
      throw new AppError(400, errorCodes.BAD_REQUEST, "Image not found");
    }
    const image_url = req.file.path;
    const token: string = JWT_OPTIONS.jwtCookieName;
    const authToken: string = req.cookies[token];
    const user = await userService.findByToken(authToken);

    const { id: user_id } = user;
    const blogData = { title, image_url, description, content, user_id };
    logger.debug(`[Update] Blog id: ${blogId}`);
    const updatedBlog = await blogService.update(blogId, blogData);
    logger.debug(`Update blog: ${updatedBlog.title} successfully`);
    res.status(200).json({ message: "Update blog successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.debug("Start deleting blog");
    const token: string = JWT_OPTIONS.jwtCookieName;
    const authToken: string = req.cookies[token];
    const user = await userService.findByToken(authToken);
    const { id: userId } = user;
    const blogId = req.params.id;
    await blogService.delete(blogId, userId);
    logger.debug("Done deleting blog");
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getBlogById = async (req: Request, res: Response, next: NextFunction) => {
  // Get by query
  try {
    const blogId = req.params.id;
    const blog = await blogService.getById(blogId);
    logger.debug(`[ID] Get blog: ${blog.blog_id}`);
    return res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};