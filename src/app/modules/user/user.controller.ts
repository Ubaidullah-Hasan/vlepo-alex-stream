import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...userData } = req.body;
    const result = await UserService.createUserToDB(userData);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'User created successfully',
      data: result,
    });
  }
);

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getUserProfileFromDB(user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Profile data retrieved successfully',
    data: result,
  });
});

const userFavouriteCategoryUpdate = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const { categoryId } = req.body;

  const result = await UserService.userFavouriteCategoryUpdate(id, categoryId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Favourite category added successfully',
    data: result,
  });
});

const savedUserEvents = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const { eventId } = req.body;

  const result = await UserService.savedUserEvents(id, eventId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Save event successfully!',
    data: result,
  });
});


const toggleFollow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const { userId } = req.body;

  const result = await UserService.toggleFollow(id, userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'You are following him!',
    data: result,
  });
});

const getFollowingUserProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;

  const result = await UserService.getFollowingUserProfile(req.query, id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Retrive followed user!',
    data: result,
  });
});


//update profile
// const updateProfile = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const user = req.user;
//     let photo;
//     if (req.files && 'image' in req.files && req.files.image[0]) {
//       photo = `/images/${req.files.image[0].filename}`;
//     }

//     const data = {
//       photo,
//       ...req.body,
//     };
//     const result = await UserService.updateProfileToDB(user, data);

//     sendResponse(res, {
//       success: true,
//       statusCode: StatusCodes.OK,
//       message: 'Profile updated successfully',
//       data: result,
//     });
//   }
// );

export const UserController = {
  createUser,
  getUserProfile,
  userFavouriteCategoryUpdate,
  savedUserEvents,
  toggleFollow,
  getFollowingUserProfile,
  // updateProfile 
};
