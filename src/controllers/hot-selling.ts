import { Request, Response } from "express";
import { HotSelling } from "../models";

async function handleGetHotSellingBusinesses(req: Request, res: Response) {
    try {
        const hotSelling = await HotSelling.find();
        const ghazalIndex = hotSelling.findIndex(
            (v) => v.business === "Ghazal"
        );
        if (ghazalIndex !== -1) {
            const rearrangedHotSelling = hotSelling.filter(
                (_, index) => index !== ghazalIndex
            );
            rearrangedHotSelling.splice(1, 0, hotSelling[ghazalIndex]);
            return res.status(200).json({ hotSelling: rearrangedHotSelling });
        }
        return res.status(200).json({ hotSelling: hotSelling });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export { handleGetHotSellingBusinesses };
