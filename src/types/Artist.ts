// Définition des types Artist basée sur le schéma MongoDB du backend
export interface Artist {
    _id?: string;
    projectName: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    guestName?: string;
    runInfo?: string;
    setup?: string;
    setupTime?: string;
    needsSoundcheck?: boolean;
    canRecordSet?: boolean;
    comments?: string;
    promoPhoto?: string;
    socialLinks?: {
        facebook?: string;
        instagram?: string;
        spotify?: string;
        soundcloud?: string;
        website?: string;
    };
    musicalStyle?: string;
    promoText?: string;
    numberOfPeople?: number;
    stage?: string;
    performanceDateTime?: string;
    soundcheckDateTime?: string;
    arrivalRun?: string;
    departureRun?: string;
    accommodation?: string;
    contract?: string;
    invoice?: string;
    roadmap?: string;
    sacemForm?: string;
    specialInfo?: string;
    fee?: number;
    travelExpenses?: number;
    totalTTC?: string;
    paymentInfo?: string;
    dataSource?: 'artist' | 'admin';
    lastModifiedBy?: 'artist' | 'admin';
    isValidated?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
