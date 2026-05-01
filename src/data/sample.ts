import type {SupportRequest} from "../types/types"

export const RequestsSampleData: SupportRequest[]  = [
    {
        id: "1",
        title: "Need food support",
        description: "I need help with food supplies",
        category: "food",
        urgency: "high",
        status: "open",
        requesterName: "John",
        contactMethod: "phone",
        contactValue: "123456789",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "2",
        title: "Need support",
        description: "I need help with supplies",
        category: "health",
        urgency: "high",
        status: "open",
        requesterName: "Allen",
        contactMethod: "phone",
        contactValue: "123456789",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
]