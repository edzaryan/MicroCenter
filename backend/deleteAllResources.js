const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const deleteAllResources = async () => {
    try {
        let resources = await cloudinary.api.resources({max_results: 500});

        while (resources.resources.length > 0) {
            const publicIds = resources.resources.map(resource => resource.public_id);

            await cloudinary.api.delete_resources(publicIds);

            resources = await cloudinary.api.resources({max_results: 500});
        }

        console.log("All resources have been deleted.");
    } catch (error) {
        console.error("Error deleting resources:", error);
    }
}

deleteAllResources();
