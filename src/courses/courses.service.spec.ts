import { NotFoundException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

describe('CoursesService', () => {
  let service: CoursesService;
  let id: string;
  let date: Date;

  beforeEach(async () => {
    service = new CoursesService();
    id = '288eeb5f-6f3a-4821-bdcf-26de0f924d89';
    date = new Date();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a course', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'testTag',
        created_at: date,
      },
    ];
    const expectOutputCourse = {
      id,
      name: 'testCourse',
      description: 'Test Description',
      created_at: date,
      tags: expectOutputTags,
    };
    const mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };
    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;
    const createCourseDto: CreateCourseDto = {
      name: 'test',
      description: 'Test Description',
      tags: ['testTag'],
    };
    const newCourse = await service.create(createCourseDto);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourse).toStrictEqual(newCourse);
  });

  it('should list courses', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'testTag',
        created_at: date,
      },
    ];
    const expectOutputCourse = [
      {
        id,
        name: 'testCourse',
        description: 'Test Description',
        created_at: date,
        tags: expectOutputTags,
      },
    ];
    const mockCourseRepository = {
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    const courses = await service.findAll();
    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(expectOutputCourse).toStrictEqual(courses);
  });

  describe('Method: findOne', () => {
    it('should get a course', async () => {
      const expectOutputTags = [
        {
          id,
          name: 'testTag',
          created_at: date,
        },
      ];
      const expectOutputCourse = [
        {
          id,
          name: 'testCourse',
          description: 'Test Description',
          created_at: date,
          tags: expectOutputTags,
        },
      ];
      const mockCourseRepository = {
        findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      };
      //@ts-expect-error defined part of methods
      service['courseRepository'] = mockCourseRepository;
      const course = await service.findOne(id);
      expect(mockCourseRepository.findOne).toHaveBeenCalled();
      expect(expectOutputCourse).toStrictEqual(course);
    });
    it('should return NotFoundException error', async () => {
      const mockCourseRepository = {
        findOne: jest.fn().mockReturnValue(undefined),
      };
      //@ts-expect-error defined part of methods
      service['courseRepository'] = mockCourseRepository;
      try {
        await service.findOne(id);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toBe(`Course ID ${id} not found`);
      }
    });
  });

  describe('Method update', () => {
    it('should update a course', async () => {
      const expectOutputTags = [
        {
          id,
          name: 'testTag',
          created_at: date,
        },
      ];
      const expectOutputCourse = {
        id,
        name: 'testCourse',
        description: 'Test Description',
        created_at: date,
        tags: expectOutputTags,
      };
      const mockCourseRepository = {
        save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
        preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      };
      const mockTagRepository = {
        create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
        findOne: jest.fn(),
      };
      //@ts-expect-error defined part of methods
      service['courseRepository'] = mockCourseRepository;
      //@ts-expect-error defined part of methods
      service['tagRepository'] = mockTagRepository;
      const updateCourseDto: UpdateCourseDto = {
        name: 'test',
        description: 'Test Description',
        tags: ['testTag'],
      };
      const course = await service.update(id, updateCourseDto);
      expect(mockCourseRepository.save).toHaveBeenCalled();
      expect(expectOutputCourse).toStrictEqual(course);
    });
    it('should return NotFoundException error', async () => {
      const expectOutputTags = [
        {
          id,
          name: 'testTag',
          created_at: date,
        },
      ];
      const mockCourseRepository = {
        preload: jest.fn().mockReturnValue(undefined),
      };
      const mockTagRepository = {
        create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
        findOne: jest.fn(),
      };
      const updateCourseDto: UpdateCourseDto = {
        name: 'test',
        description: 'Test Description',
        tags: ['testTag'],
      };
      //@ts-expect-error defined part of methods
      service['courseRepository'] = mockCourseRepository;
      //@ts-expect-error defined part of methods
      service['tagRepository'] = mockTagRepository;
      try {
        await service.update(id, updateCourseDto);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toBe(`course ID ${id} not found`);
      }
    });
  });

  describe('Method delete', () => {
    it('should delete a course', async () => {
      const expectOutputTags = [
        {
          id,
          name: 'testTag',
          created_at: date,
        },
      ];
      const expectOutputCourse = [
        {
          id,
          name: 'testCourse',
          description: 'Test Description',
          created_at: date,
          tags: expectOutputTags,
        },
      ];
      const mockCourseRepository = {
        findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
        remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      };
      //@ts-expect-error defined part of methods
      service['courseRepository'] = mockCourseRepository;
      const course = await service.remove(id);
      expect(mockCourseRepository.remove).toHaveBeenCalled();
      expect(expectOutputCourse).toStrictEqual(course);
    });
    it('should return NotFoundException error', async () => {
      const mockCourseRepository = {
        findOne: jest.fn().mockReturnValue(undefined),
      };
      //@ts-expect-error defined part of methods
      service['courseRepository'] = mockCourseRepository;
      try {
        await service.remove(id);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toBe(`Course ID ${id} not found`);
      }
    });
  });
});
