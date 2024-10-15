interface Course {
    name: string;
    duration: number;
    students: string[];
}

class OnlineCourse implements Course {
    students: string[] = [];

    constructor(public name: string, public duration: number) {
    }

    registerStudent(student: string): void {
        if (!this.isStudentRegistered(student)) {
            this.students.push(student);
        }
    }

    isStudentRegistered(student: string): boolean {
        return this.students.includes(student);
    }
}

class CourseManager {
    #courses: Course[] = [];

    addCourse(course: Course): void {
        this.#courses.push(course);
    }

    removeCourse(courseName: string): void {
        this.#courses = this.#courses.filter(course => course.name !== courseName);
    }

    findCourse(courseName: string): Course | undefined {
        return this.#courses.find(course => course.name === courseName);
    }

    listCourses(): void {
        this.#courses.forEach(course => {
            console.log(`Course: ${course.name}, Duration: ${course.duration}h`);
            console.log(`Students: ${course.students.join(", ")}`);
        });
    }
}

const course1 = new OnlineCourse("JavaScript Basics", 40);
const course2 = new OnlineCourse("TypeScript Advanced", 30);

course1.registerStudent("Alice");
course1.registerStudent("Bob");
course2.registerStudent("Charlie");

const courseManager = new CourseManager();
courseManager.addCourse(course1);
courseManager.addCourse(course2);

courseManager.listCourses();